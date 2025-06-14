import React from 'react';
import { usePluginStore } from '../store/plugin-store';
import { t } from '../i18n';
import { LucideIcon } from './LucideIcon';
import { delegateToModeOrCurrentChat, getCurrentChatId } from '../utils/chat/chat-delegation';

interface ValidationFixButtonProps {
	type: 'modes' | 'tools' | 'specific-mode';
	modeId?: string; // For specific mode fixes
	className?: string;
	showIcon?: boolean;
	displayMode?: 'button-only' | 'text-and-button'; // New prop for display mode
}

export const ValidationFixButton: React.FC<ValidationFixButtonProps> = ({ 
	type, 
	modeId, 
	className = '', 
	showIcon = true,
	displayMode = 'text-and-button'
}) => {
	const store = usePluginStore();
	const invalidModes = store.validation.invalidModes;
	const invalidTools = store.validation.invalidTools;
	
	// Don't show if no validation issues
	if (type === 'modes' && invalidModes.length === 0) return null;
	if (type === 'tools' && invalidTools.length === 0) return null;
	if (type === 'specific-mode' && modeId && !invalidModes.includes(modeId)) return null;
	
	const handleClick = async () => {
		// Create appropriate message based on type
		let message = '';
		switch (type) {
			case 'modes':
				// Format file paths nicely - show first 5 and indicate if there are more
				const modePathsFormatted = invalidModes.length <= 5 
					? invalidModes.join(', ')
					: `${invalidModes.slice(0, 5).join(', ')} and ${invalidModes.length - 5} more`;
				message = invalidModes.length === 1 ? t('validation.fixModes.message.singular', {
					filePaths: modePathsFormatted,
				}) : (invalidModes.length >= 2 && invalidModes.length <= 4 ? t('validation.fixModes.message.few', {
					filePaths: modePathsFormatted,
				}) : t('validation.fixModes.message.many', {
					filePaths: modePathsFormatted,
				}));
				break;
			case 'tools':
				// Format file paths nicely - show first 5 and indicate if there are more
				const toolPathsFormatted = invalidTools.length <= 5 
					? invalidTools.join(', ')
					: `${invalidTools.slice(0, 5).join(', ')} and ${invalidTools.length - 5} more`;
				message = invalidTools.length === 1 ? t('validation.fixTools.message.singular', {
					filePaths: toolPathsFormatted,
				}) : (invalidTools.length >= 2 && invalidTools.length <= 4 ? t('validation.fixTools.message.few', {
					filePaths: toolPathsFormatted,
				}) : t('validation.fixTools.message.many', {
					filePaths: toolPathsFormatted,
				}));
				break;
			case 'specific-mode':
				const filePath = modeId || 'this mode';
				message = t('validation.fixSpecificMode.message', {
					filePath,
				});
				break;
		}
		
		// Use unified chat delegation - will use current chat if empty, create new if not
		await delegateToModeOrCurrentChat({
			targetModeId: ':prebuilt:guide',
			message: message,
			currentChatId: getCurrentChatId() || undefined,
		});
	};
	
	// Get button text based on type
	const getButtonText = () => {
		switch (type) {
			case 'modes':
				return t('validation.fixModes.button');
			case 'tools':
				return t('validation.fixTools.button');
			case 'specific-mode':
				return t('validation.fixSpecificMode.button');
		}
	};
	
	// Get description text
	const getDescriptionText = () => {
		switch (type) {
			case 'modes':
				return invalidModes.length === 1 ? t('validation.fixModes.description.singular') : (invalidModes.length >= 2 && invalidModes.length <= 4 ? t('validation.fixModes.description.few') : t('validation.fixModes.description.many'));
			case 'tools':
				return invalidTools.length === 1 ? t('validation.fixTools.description.singular') : (invalidTools.length >= 2 && invalidTools.length <= 4 ? t('validation.fixTools.description.few') : t('validation.fixTools.description.many'));
			case 'specific-mode':
				const modeName = modeId ? modeId.split('/').pop()?.replace('.md', '') || modeId : 'This mode';
				return t('validation.fixSpecificMode.description', {
					modeName,
				});
		}
	};
	
	if (displayMode === 'button-only') {
		return (
			<button
				onClick={handleClick}
				className={`validation-fix-button ${className}`}
				title={t('validation.helpButton.tooltip')}
			>
				{showIcon && '🔧 '}
				{getButtonText()}
			</button>
		);
	}
	
	// Default: text-and-button mode
	return (
		<div className={`validation-fix-section ${className}`}>
			{getDescriptionText() && (
				<div className="validation-description">
					⚠️ {getDescriptionText()}
				</div>
			)}
			<button
				onClick={handleClick}
				className="validation-fix-button"
				title={t('validation.helpButton.tooltip')}
			>
				🔧 {getButtonText()}
			</button>
		</div>
	);
}; 