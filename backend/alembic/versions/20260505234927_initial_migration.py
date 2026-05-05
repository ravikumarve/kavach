"""Initial migration - Create User, Document, Template, Subscription tables

Revision ID: 20260505234927
Revises: 
Create Date: 2026-05-05 23:49:27.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '20260505234927'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('full_name', sa.String(length=255), nullable=True),
        sa.Column('phone', sa.String(length=20), nullable=True),
        sa.Column('company_name', sa.String(length=255), nullable=True),
        sa.Column('plan', sa.Enum('free', 'starter', 'pro', 'agency', name='planenum'), nullable=False),
        sa.Column('documents_used_this_month', sa.Integer(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_plan'), 'users', ['plan'], unique=False)
    
    # Create templates table
    op.create_table(
        'templates',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('doc_type', sa.String(length=100), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('form_schema', sa.JSON(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('doc_type')
    )
    op.create_index(op.f('ix_templates_doc_type'), 'templates', ['doc_type'], unique=True)
    
    # Create subscriptions table
    op.create_table(
        'subscriptions',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('plan', sa.Enum('free', 'starter', 'pro', 'agency', name='planenum'), nullable=False),
        sa.Column('status', sa.Enum('active', 'cancelled', 'expired', 'pending', name='subscriptionstatusenum'), nullable=False),
        sa.Column('razorpay_subscription_id', sa.String(length=255), nullable=True),
        sa.Column('razorpay_plan_id', sa.String(length=255), nullable=True),
        sa.Column('start_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('end_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_subscriptions_user_id'), 'subscriptions', ['user_id'], unique=False)
    
    # Create documents table
    op.create_table(
        'documents',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('doc_type', sa.Enum('nda', 'freelance_contract', 'rent_agreement', 'vendor_agreement', 'offer_letter', 'partnership_deed', 'service_agreement', 'consultant_agreement', name='documenttypeenum'), nullable=False),
        sa.Column('title', sa.String(length=500), nullable=False),
        sa.Column('content_json', sa.JSON(), nullable=False),
        sa.Column('content_html', sa.Text(), nullable=True),
        sa.Column('pdf_path', sa.String(length=500), nullable=True),
        sa.Column('docx_path', sa.String(length=500), nullable=True),
        sa.Column('status', sa.Enum('draft', 'complete', 'archived', name='documentstatusenum'), nullable=False),
        sa.Column('clauses', sa.JSON(), nullable=True),
        sa.Column('doc_metadata', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_documents_doc_type'), 'documents', ['doc_type'], unique=False)
    op.create_index(op.f('ix_documents_user_id'), 'documents', ['user_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_documents_user_id'), table_name='documents')
    op.drop_index(op.f('ix_documents_doc_type'), table_name='documents')
    op.drop_table('documents')
    
    op.drop_index(op.f('ix_subscriptions_user_id'), table_name='subscriptions')
    op.drop_table('subscriptions')
    
    op.drop_index(op.f('ix_templates_doc_type'), table_name='templates')
    op.drop_table('templates')
    
    op.drop_index(op.f('ix_users_plan'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    
    # Drop enum types
    op.execute('DROP TYPE IF EXISTS planenum')
    op.execute('DROP TYPE IF EXISTS subscriptionstatusenum')
    op.execute('DROP TYPE IF EXISTS documenttypeenum')
    op.execute('DROP TYPE IF EXISTS documentstatusenum')
