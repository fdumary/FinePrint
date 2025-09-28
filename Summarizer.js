import ollama from 'ollama'

async function UseOllama(prompt) {
    const response = await ollama.chat({
        model: 'llama3',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
    })

    let fullResponse = ''
    for await (const part of response) {
        if (part.message?.content) {
            process.stdout.write(part.message.content)
            fullResponse += part.message.content
        }
    }

    return fullResponse
}

var givePrompt = "Act as a legal expert and you are reviewing the terms and conditions your client has provided. Your job is to simplify the document into a more understandable form so that your client, who is unfamiliar with legal terminology, can understand it."
givePrompt += " This document constitutes a legally binding agreement (\"Agreement\") between the User (\"You\") and the Service Provider (\"Company\") governing Your access to and use of the services, website, and all associated content (collectively, the \"Service\"). By accessing or using the Service, You acknowledge that You have read, understood, and agree to be bound by these Terms and Conditions. The Company reserves the right, at its sole discretion, to modify or replace these terms at any time without prior notice. Continued use of the Service following any such changes shall constitute Your acceptance of the revised Terms."
givePrompt += " You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Service. You shall not upload or transmit any material that is libelous, defamatory, obscene, or harmful to minors. All intellectual property rights, including but not limited to copyrights, patents, and trademarks in the Service and its contents, are owned by or licensed to the Company. Unauthorized use, reproduction, or distribution of this content is strictly prohibited and may result in civil and criminal penalties, including statutory damages."
givePrompt += " The Service is provided on an \"as is\" and \"as available\" basis without any warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement. In no event shall the Company be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including, but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses. The Company may terminate or suspend your access to all or part of the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms set forth herein.";

UseOllama(givePrompt).then(console.log)