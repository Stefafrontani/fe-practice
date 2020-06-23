import messages from './messages';

interface DocumentContent {
    title: string,
    description: string,
}

interface Config {
    [key: string]: DocumentContent,
}

const Config: Config = {
    "default": {
        title: messages.tutela.title,
        description: messages.tutela.description
    },
    "1": {
        title: messages.tutela.title,
        description: messages.tutela.description
    },
    "2": {
        title: messages.contrato.title,
        description: messages.contrato.description
    }
}

export default Config;