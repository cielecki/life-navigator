import React, { useState, useEffect } from 'react';
import { t } from 'src/i18n';
import { getStore } from '../../store/plugin-store';
import { LucideIcon } from '../LucideIcon';

export const LanguageSelectionScreen: React.FC = () => {
	const [currentLanguage, setCurrentLanguage] = useState<string>('');
	const [isConfiguring, setIsConfiguring] = useState(false);

	// Get current Obsidian language setting
	useEffect(() => {
		const obsidianLang = window.localStorage.getItem('language') || 'en';
		setCurrentLanguage(obsidianLang);
	}, []);

	const supportedLanguages = [
		{ code: 'en', name: 'English', nativeName: 'English' },
		{ code: 'pl', name: 'Polish', nativeName: 'Polski' }
	];

	const handleLanguageChange = async (languageCode: string) => {
		setIsConfiguring(true);
		try {
			// Set Obsidian's language
			window.localStorage.setItem('language', languageCode);
			
			// Mark language as configured in plugin settings
			getStore().setObsidianLanguageConfigured(true);
			await getStore().saveSettings();

			if (languageCode !== currentLanguage) {
				if (window.app && (window.app as any).commands) {
					// @ts-ignore - Try to execute reload command
					(window.app as any).commands.executeCommandById('app:reload');
				} else {
					alert(t('ui.setup.language.manualRestart'));
				}
			}
		} catch (error) {
			console.error('Error configuring language:', error);
		} finally {
			setIsConfiguring(false);
		}
	};

	const isCurrentLanguageSupported = () => {
		return supportedLanguages.some(lang => lang.code === currentLanguage);
	};

	const getCurrentLanguageName = () => {
		const lang = supportedLanguages.find(l => l.code === currentLanguage);
		return lang ? lang.nativeName : currentLanguage;
	};

	// Create available language options including current unsupported language
	const getAvailableLanguages = () => {
		const languages = [...supportedLanguages];
		
		// Add current language if it's not supported
		if (!isCurrentLanguageSupported() && currentLanguage) {
			languages.push({
				code: currentLanguage,
				name: currentLanguage,
				nativeName: `${currentLanguage}`
			});
		}
		
		return languages;
	};

	return (
		<div className="setup-screen-focused">
			<div className="setup-content-focused">
				<div className="setup-icon">
					<LucideIcon name="languages" size={64} color="var(--interactive-accent)" />
				</div>
				
				<h2 className="setup-title-focused">
					{t('ui.setup.language.title')}
				</h2>
				
				<p className="setup-description-focused">
					{t('ui.setup.language.description')}
				</p>

				{!isCurrentLanguageSupported() && (
					<div className="setup-language-info">
						<div className="setup-current-language">
							<strong>{t('ui.setup.language.currentLanguage')}</strong> {getCurrentLanguageName()}
						</div>
					</div>
				)}
				
				<div className="setup-language-options">
					<h3>{t('ui.setup.language.supportedLanguages')}</h3>
					<div className="setup-language-buttons">
						{getAvailableLanguages().map((lang) => (
							<button
								key={lang.code}
								className={`setup-language-button ${currentLanguage === lang.code ? 'current' : ''}`}
								onClick={() => handleLanguageChange(lang.code)}
								disabled={isConfiguring}
							>
								<div className="language-button-content">
									<span className="language-name">
										{lang.nativeName}
									</span>
									{currentLanguage === lang.code && (
										<span className="language-current-indicator">
											<LucideIcon name="check" size={16} color="var(--interactive-accent)" />
										</span>
									)}
								</div>
							</button>
						))}
					</div>
				</div>

				<div className="setup-language-note">
					<p>{t('ui.setup.language.note')}</p>
				</div>
			</div>
		</div>
	);
}; 