export function parseHomework(homeworkInput: string): { subject: string; question: string } {
    const [subject, ...questionParts] = homeworkInput.split(':');
    const question = questionParts.join(':').trim();
    return { subject: subject.trim(), question };
}

export function parseUserInput(userInput: string): string[] {
    return userInput.split('\n').map(line => line.trim()).filter(line => line.length > 0);
}