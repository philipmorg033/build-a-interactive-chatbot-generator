interface Intent {
  name: string;
  patterns: string[];
  response: string;
}

interface ChatbotConfig {
  name: string;
  description: string;
  intents: Intent[];
}

class ChatbotGenerator {
  private config: ChatbotConfig;

  constructor(config: ChatbotConfig) {
    this.config = config;
  }

  generateChatbot() {
    const intentMatchers: {[key: string]: RegExp} = {};
    this.config.intents.forEach((intent) => {
      intentMatchers[intent.name] = new RegExp(intent.patterns.join('|'), 'i');
    });

    const chatbotCode: string[] = [];
    chatbotCode.push(`class ${this.config.name}Chatbot {`);
    chatbotCode.push(`  private message: string;`);
    chatbotCode.push(`  constructor(message: string) {`);
    chatbotCode.push(`    this.message = message;`);
    chatbotCode.push(`  }`);
    chatbotCode.push(`  respond(): string {`);
    chatbotCode.push(`    let response = '';`);
    chatbotCode.push(`    for (const intentName in intentMatchers) {`);
    chatbotCode.push(`      if (intentMatchers[intentName].test(this.message)) {`);
    chatbotCode.push(`        response = this.config.intents.find((intent) => intent.name === intentName).response;`);
    chatbotCode.push(`        break;`);
    chatbotCode.push(`      }`);
    chatbotCode.push(`    }`);
    chatbotCode.push(`    return response;`);
    chatbotCode.push(`  }`);
    chatbotCode.push(`}`);
    return chatbotCode.join('\n');
  }
}

const config: ChatbotConfig = {
  name: 'MyChatbot',
  description: 'A simple chatbot',
  intents: [
    {
      name: 'greeting',
      patterns: ['hello', 'hi', 'hey'],
      response: 'Hello! How can I assist you?',
    },
    {
      name: 'goodbye',
      patterns: ['bye', 'goodbye', 'see you'],
      response: 'Goodbye! Have a nice day!',
    },
  ],
};

const generator = new ChatbotGenerator(config);
const chatbotCode = generator.generateChatbot();
console.log(chatbotCode);