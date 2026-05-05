#!/usr/bin/env python3
"""Test database connection"""

from database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        result = conn.execute(text('SELECT 1'))
        print('✅ Database connection successful!')
        print(f'Result: {result.fetchone()}')
except Exception as e:
    print(f'❌ Database connection failed: {e}')
