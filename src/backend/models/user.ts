export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserModel {
    constructor(private userData: User) {}

    save() {
        // Logic to save user data to the database
    }

    static findById(userId: string): UserModel | null {
        // Logic to find a user by ID
        return null; // Placeholder return
    }

    static findByEmail(email: string): UserModel | null {
        // Logic to find a user by email
        return null; // Placeholder return
    }
}