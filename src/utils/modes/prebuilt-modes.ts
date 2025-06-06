import { LNMode } from 'src/types/LNMode';
import { t } from 'src/i18n';
import { mergeWithDefaultMode } from './ln-mode-defaults';

/**
 * Get all pre-built modes that are always available in the system
 * These modes exist in code rather than as files and cannot be deleted
 */
export function getPrebuiltModes(): LNMode[] {
	const lifeNavigatorMode: Partial<LNMode> = {
		ln_name: t('prebuiltModes.lifeNavigator.title'),
		ln_path: ':prebuilt:guide',
		ln_description: t('prebuiltModes.lifeNavigator.mainDescription'),
		ln_system_prompt: t('prebuiltModes.lifeNavigator.systemPrompt'),
		ln_voice_instructions: t('prebuiltModes.lifeNavigator.voiceInstructions'),
		ln_icon: 'compass',
		ln_icon_color: '#4ade80',
		ln_example_usages: [
			'Start'
		],
		ln_tools_allowed: ['*'],
		ln_tools_disallowed: ['*task_*'],
		ln_model: 'auto',
		ln_expand_links: false,
		ln_voice_autoplay: false,
	};

	// Merge with defaults to ensure all required fields are present
	const lifeNavigator = mergeWithDefaultMode(lifeNavigatorMode);

	return [lifeNavigator];
}

/**
 * Check if a mode is pre-built (cannot be deleted)
 */
export function isPrebuiltMode(modePath: string): boolean {
	return modePath.startsWith(':prebuilt:');
} 