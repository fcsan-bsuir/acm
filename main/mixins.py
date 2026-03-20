import json
from pathlib import Path

from django.shortcuts import render
from main.models import Translation


class LanguageMixin:
    _json_translations_cache = None

    @classmethod
    def _load_json_translations(cls):
        if cls._json_translations_cache is not None:
            return cls._json_translations_cache

        translations_path = Path(__file__).resolve().parents[1] / "translations.json"
        try:
            with translations_path.open(encoding="utf-8") as f:
                cls._json_translations_cache = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            cls._json_translations_cache = {}

        return cls._json_translations_cache

    def _get_json_language_translations(self, language):
        raw = self._load_json_translations()
        result = {}

        for key, values in raw.items():
            if not isinstance(values, dict):
                continue
            value = values.get(language)
            if value is not None:
                result[key] = value

        return result

    def get_user_language(self, request):
        user_language = request.GET.get('lang') or request.session.get('language', 'ru')

        if user_language:
            request.session['language'] = user_language

        return user_language

    def get_translations(self, language):
        file_translations = self._get_json_language_translations(language)
        db_translations_qs = Translation.objects.filter(
            language=language
        ).values_list(
            'translation_key__key',
            'translated_text'
        )
        
        db_translations = dict(db_translations_qs)
        
        file_translations.update(db_translations)
        return file_translations

    def render_page(self, request, template_name, context=None):
        if context is None:
            context = {}

        user_language = self.get_user_language(request)
        translations_dict = self.get_translations(user_language)

        _context = {
            'tr': translations_dict,
            'selected_language': user_language,
        }

        _context.update(context)
        return render(request, template_name, _context)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if context is None:
            context = {}

        user_language = self.get_user_language(self.request)
        translations_dict = self.get_translations(user_language)

        _context = {
            'tr': translations_dict,
            'selected_language': user_language,
        }

        _context.update(context)
        return _context
