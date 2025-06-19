*Your privacy and data control are fundamental to how Life Navigator works*

Last updated: January 2025

## Summary

Life Navigator is designed with privacy at its core. Here's what you need to know:

### 🔒 Your Data Stays Private
- **No telemetry or tracking**: Life Navigator follows Obsidian's strict privacy standards
- **Local storage**: Your conversations and notes remain on your device
- **Two usage options**: Use your own API keys (direct to AI providers) or our subscription service
- **You control what gets shared**: Only data you explicitly include in prompts is sent to AI providers

### 🤖 AI Provider Data Handling
**With your own API keys (direct connection):**
- **Direct to AI providers**: Your prompts go straight to OpenAI/Anthropic
- **30-day retention**: AI providers automatically delete your data after 30 days
- **No training on your data**: Your conversations aren't used to train AI models

**With Life Navigator subscription (proxy connection):**
- **Through our proxy**: Your prompts pass through our servers to reach AI providers
- **Same privacy policy as OpenAI**: We follow the same 30-day retention and no-training policies
- **Industry-standard security**: Your data is encrypted in transit and at rest

### 📊 What We Track
**With your own API keys:**
- **Nothing**: We don't track or store any data when you use your own API keys
- **Local only**: All usage data stays on your device

**With Life Navigator subscription:**
- **Usage metrics**: Token counts and API usage for billing purposes (no conversation content)
- **Account data**: Email address and subscription status for billing
- **Error logs**: Anonymous crash reports to improve reliability
- **No conversation content**: We never store your actual prompts or AI responses

---

## Detailed Privacy Information

### Data Collection and Processing

#### What Life Navigator Collects

**With your own API keys (local operation):**
- **Nothing by default**: Life Navigator operates entirely locally on your device
- **Local storage only**: API keys stored locally and encrypted on your device
- **No telemetry**: We don't track or collect any usage data

**With Life Navigator subscription:**
- **Account information**: Email address for account management and billing
- **Usage data**: Token consumption and API usage for billing purposes
- **Subscription data**: Plan type, billing status, and payment information (handled by Stripe)
- **Technical metadata**: Request timestamps and error logs for service reliability

#### What Life Navigator Never Collects (in both modes)
- **Conversation content**: Your prompts, AI responses, or conversation histories
- **Document content**: Files you analyze or notes you work with
- **Personal information**: Beyond email for subscription accounts
- **Browsing behavior**: How you use Obsidian or which notes you access
- **Device information**: Beyond what's needed for basic functionality

### Third-Party Services

#### AI Providers (OpenAI, Anthropic)
**With your own API keys:**
- Your data goes directly to AI providers according to their policies
- You have a direct relationship with OpenAI/Anthropic

**With Life Navigator subscription:**
- Your data passes through our proxy service to reach AI providers
- We follow the same privacy policies as the AI providers

**All AI provider policies:**
- **OpenAI (ChatGPT)**: [30-day retention](https://platform.openai.com/docs/models/how-we-use-your-data), [no training on API data](https://openai.com/privacy)
- **Anthropic (Claude)**: [30-day retention](https://docs.anthropic.com/claude/docs/privacy-policy), [no model training](https://www.anthropic.com/privacy)

**Your control (in both modes):**
- You choose what information to include in prompts
- You can avoid sensitive data by being mindful of what you share
- Same privacy protections regardless of which option you choose

#### Payment Processing (Subscription users only)
- **Stripe**: Handles all payment processing with PCI DSS compliance
- **No payment data storage**: Credit card information never touches our servers
- **Billing data**: We only receive subscription status and usage totals

#### Other Integrations
- **GitHub**: For fetching updates and documentation (no personal data sent)
- **Obsidian Community**: For plugin distribution (handled by Obsidian's systems)

### Your Privacy Rights

#### Data Control
**With your own API keys:**
- **Complete local control**: All data stays on your device
- **Offline usage**: Core features work without internet connection
- **API key control**: Add, edit, or remove API keys at any time

**With Life Navigator subscription:**
- **Account management**: View and delete your account anytime
- **Usage transparency**: See your token usage and billing data
- **Data deletion**: Request deletion of your account and associated data
- **Export data**: Download your usage history and account information

**In both modes:**
- **Delete conversations**: Remove any conversation instantly from your device
- **Export notes**: Your notes are stored in standard formats you control

#### Transparency
- **Open source**: Life Navigator's code is publicly available for review
- **Clear documentation**: All data handling is documented and explained
- **Regular updates**: Privacy policy changes are clearly communicated
- **Usage options**: You can switch between API key and subscription modes anytime

### Data Security

#### Local Security (both modes)
- **Encrypted storage**: API keys and sensitive settings are encrypted on your device
- **Obsidian's security**: Inherits all of Obsidian's security measures
- **Local notes**: Your notes and conversations always stay on your device

#### Network Security
**With your own API keys:**
- **Direct connection**: No intermediaries between you and AI providers
- **HTTPS encryption**: All API calls use industry-standard encryption

**With Life Navigator subscription:**
- **Encrypted transit**: All data encrypted between your device and our proxy
- **Secure proxy**: Industry-standard security measures for our proxy service
- **Same encryption**: Your data is encrypted to AI providers just like direct connections
- **No persistent storage**: Data passes through our proxy without being saved (currently)

### Compliance

#### Obsidian Plugin Standards
Life Navigator adheres to all Obsidian community plugin requirements:
- No telemetry or usage tracking
- No unauthorized network requests
- Clear disclosure of all network usage
- Respect for user privacy and data control

#### Future Considerations
**Incident Response**: If Life Navigator ever needs to implement incident response procedures (similar to OpenAI's approach), we would:
- Notify users in advance through this privacy policy
- Provide clear opt-out mechanisms
- Retain data only for the minimum time necessary
- Follow industry best practices for data protection

Currently, Life Navigator has no incident response data retention as we don't operate servers or store user data.

### Changes to This Policy

We may update this privacy policy to reflect changes in Life Navigator's features or legal requirements. When we do:

- **Clear notification**: Updates will be announced through Life Navigator's interface
- **Version control**: Previous versions will remain accessible through GitHub
- **User choice**: Significant changes will include information about your options

You can view the complete history of this privacy policy in our [GitHub repository](https://github.com/cielecki/life-navigator/commits/main/PRIVACY.md).

### Contact and Questions

**For privacy-related questions:**
- Review our [documentation](https://github.com/cielecki/life-navigator/tree/main/docs)
- Check [GitHub discussions](https://github.com/cielecki/life-navigator/discussions) for community support
- Submit issues through [GitHub](https://github.com/cielecki/life-navigator/issues)

**For data handling by AI providers:**
- OpenAI: [privacy@openai.com](mailto:privacy@openai.com)
- Anthropic: [privacy@anthropic.com](mailto:privacy@anthropic.com)

---

*Life Navigator is developed by independent developers who believe in user privacy and data control. This policy reflects our commitment to transparency and your right to understand how your data is handled.* 