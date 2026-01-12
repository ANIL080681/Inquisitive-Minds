export function validateTextInput(input: string): boolean {
    const regex = /^[a-zA-Z0-9\s.,!?'"-]*$/;
    return regex.test(input);
}

export function validateNumberInput(input: string): boolean {
    const regex = /^-?\d+(\.\d+)?$/;
    return regex.test(input);
}

export function validateEmailInput(input: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input);
}

export function validateHomeworkInput(input: string): boolean {
    return input.trim().length > 0;
}