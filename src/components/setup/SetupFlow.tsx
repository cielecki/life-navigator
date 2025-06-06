import React, { useCallback } from 'react';
import { SetupStep } from '../../store/setup-slice';
import { LanguageSelectionScreen } from './LanguageSelectionScreen';
import { AnthropicKeyScreen } from './AnthropicKeyScreen';
import { OpenAIKeyScreen } from './OpenAIKeyScreen';
import { usePluginStore } from '../../store/plugin-store';

interface SetupFlowProps {
	lnModes: Record<string, any>;
}

export const SetupFlow: React.FC<SetupFlowProps> = ({ lnModes }) => {
	const currentStep = usePluginStore(state => state.setup.currentStep);

	switch (currentStep) {
		case SetupStep.CONFIGURE_LANGUAGE:
			return (
				<LanguageSelectionScreen />
			);

		case SetupStep.CONFIGURE_ANTHROPIC_KEY:
			return (
				<AnthropicKeyScreen />
			);

		case SetupStep.CONFIGURE_OPENAI_KEY:
			return (
				<OpenAIKeyScreen />
			);

		default:
			// This shouldn't happen if setup is working correctly
			return (
				<div className="ln-text-center ln-text-muted ln-p-4">
					Setup complete! Welcome to Life Navigator.
				</div>
			);
	}
}; 