"""
Kavach - AI Legal Document Engine for India
AI Engine Service - Groq API + NVIDIA NIM API Integration
"""

from groq import Groq
from openai import OpenAI  # For NVIDIA NIM API compatibility
from typing import Dict, Any, Optional
import os
from config import settings


class AIEngine:
    """AI Engine for legal document generation using Groq API and NVIDIA NIM API"""
    
    def __init__(self):
        """Initialize AI clients"""
        # Groq API client
        self.groq_client = Groq(api_key=settings.GROQ_API_KEY)
        self.groq_model = settings.GROQ_MODEL
        self.groq_temperature = settings.GROQ_TEMPERATURE
        self.groq_max_tokens = settings.GROQ_MAX_TOKENS
        
        # NVIDIA NIM API client (for testing)
        self.nim_client = OpenAI(
            base_url=settings.NVIDIA_NIM_API_URL,
            api_key=settings.NVIDIA_NIM_API_KEY
        )
        self.nim_model = settings.NVIDIA_NIM_MODEL
        self.nim_temperature = settings.NVIDIA_NIM_TEMPERATURE
        self.nim_max_tokens = settings.NVIDIA_NIM_MAX_TOKENS
        
        # NVIDIA NIM API backup client
        self.nim_client_backup = OpenAI(
            base_url=settings.NVIDIA_NIM_API_URL,
            api_key=settings.NVIDIA_NIM_API_KEY_BACKUP
        )
        self.nim_model_backup = settings.NVIDIA_NIM_MODEL_BACKUP
        self.nim_temperature_backup = settings.NVIDIA_NIM_TEMPERATURE
        self.nim_max_tokens_backup = settings.NVIDIA_NIM_MAX_TOKENS
        
        # Default to Groq API
        self.use_nim = False
        self.use_nim_backup = False
    
    async def generate_document(
        self,
        doc_type: str,
        form_data: Dict[str, Any],
        system_prompt: Optional[str] = None,
        use_nim: bool = False
    ) -> str:
        """
        Generate a legal document using AI
        
        Args:
            doc_type: Type of document to generate
            form_data: Form data from user input
            system_prompt: Optional custom system prompt
            use_nim: Whether to use NVIDIA NIM API instead of Groq
            
        Returns:
            Generated document content as HTML
        """
        try:
            # Load system prompt
            if system_prompt is None:
                system_prompt = self._load_system_prompt(doc_type)
            
            # Build user prompt from form data
            user_prompt = self._build_user_prompt(doc_type, form_data)
            
            # Generate response using selected API
            if use_nim:
                content = await self._generate_with_nim(system_prompt, user_prompt)
            else:
                content = await self._generate_with_groq(system_prompt, user_prompt)
            
            return content
            
        except Exception as e:
            raise Exception(f"AI generation failed: {str(e)}")
    
    async def _generate_with_groq(
        self,
        system_prompt: str,
        user_prompt: str
    ) -> str:
        """Generate document using Groq API"""
        try:
            response = self.groq_client.chat.completions.create(
                model=self.groq_model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=self.groq_temperature,
                max_tokens=self.groq_max_tokens,
                stream=False
            )
            
            content = response.choices[0].message.content
            return content
            
        except Exception as e:
            raise Exception(f"Groq API generation failed: {str(e)}")
    
    async def _generate_with_nim(
        self,
        system_prompt: str,
        user_prompt: str
    ) -> str:
        """Generate document using NVIDIA NIM API"""
        try:
            response = self.nim_client.chat.completions.create(
                model=self.nim_model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=self.nim_temperature,
                max_tokens=self.nim_max_tokens,
                stream=False
            )
            
            content = response.choices[0].message.content
            return content
            
        except Exception as e:
            # Try backup model
            try:
                response = self.nim_client_backup.chat.completions.create(
                    model=self.nim_model_backup,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    temperature=self.nim_temperature_backup,
                    max_tokens=self.nim_max_tokens_backup,
                    stream=False
                )
                
                content = response.choices[0].message.content
                return content
                
            except Exception as backup_error:
                raise Exception(f"NVIDIA NIM API generation failed (both primary and backup): {str(e)}, {str(backup_error)}")
    
    async def refine_document(
        self,
        original_content: str,
        instruction: str,
        doc_type: str,
        use_nim: bool = False
    ) -> str:
        """
        Refine an existing document based on user instruction
        
        Args:
            original_content: Original document content
            instruction: User's refinement instruction
            doc_type: Type of document
            use_nim: Whether to use NVIDIA NIM API instead of Groq
            
        Returns:
            Refined document content
        """
        try:
            system_prompt = self._load_system_prompt(doc_type)
            
            if use_nim:
                response = self.nim_client.chat.completions.create(
                    model=self.nim_model,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "assistant", "content": original_content},
                        {"role": "user", "content": f"Please refine this document based on: {instruction}"}
                    ],
                    temperature=self.nim_temperature,
                    max_tokens=self.nim_max_tokens,
                    stream=False
                )
            else:
                response = self.groq_client.chat.completions.create(
                    model=self.groq_model,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "assistant", "content": original_content},
                        {"role": "user", "content": f"Please refine this document based on: {instruction}"}
                    ],
                    temperature=self.groq_temperature,
                    max_tokens=self.groq_max_tokens,
                    stream=False
                )
            
            content = response.choices[0].message.content
            
            return content
            
        except Exception as e:
            raise Exception(f"Document refinement failed: {str(e)}")
    
    def _load_system_prompt(self, doc_type: str) -> str:
        """
        Load system prompt for document type
        
        Args:
            doc_type: Type of document
            
        Returns:
            System prompt content
        """
        # Try to load from prompts directory
        prompt_file = f"prompts/{doc_type}.txt"
        
        if os.path.exists(prompt_file):
            with open(prompt_file, 'r') as f:
                return f.read()
        
        # Fallback to base system prompt
        return self._get_base_system_prompt()
    
    def _get_base_system_prompt(self) -> str:
        """Get base system prompt for Indian legal documents"""
        return """You are Kavach, an expert Indian legal document drafter with deep knowledge of:
- Indian Contract Act 1872
- Information Technology Act 2000
- Indian Stamp Act 1899 (and state amendments)
- GST Act 2017 (for service agreements)
- MSME Development Act 2006
- Labour laws relevant to offer letters

Rules for every document you generate:
1. Use clear, plain English mixed with necessary legal terminology
2. Include proper party definitions at the start
3. Add governing law clause — default jurisdiction: [USER_STATE], India
4. Include dispute resolution: arbitration preferred over litigation
5. Add GST clause if service_type is taxable
6. Flag stamp duty requirement based on state
7. End with signature block: name, designation, date, place
8. Output valid HTML that can be directly rendered in preview pane"""
    
    def _build_user_prompt(self, doc_type: str, form_data: Dict[str, Any]) -> str:
        """
        Build user prompt from form data
        
        Args:
            doc_type: Type of document
            form_data: Form data from user
            
        Returns:
            Formatted user prompt
        """
        prompt = f"Generate a {doc_type.replace('_', ' ').title()} document with the following details:\n\n"
        
        for key, value in form_data.items():
            if value:
                prompt += f"{key.replace('_', ' ').title()}: {value}\n"
        
        return prompt


# Singleton instance
ai_engine = AIEngine()
EOF