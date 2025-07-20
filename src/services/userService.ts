/**
 * Interface cho thông tin người dùng
 */
interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  name: string;
  avatar?: string;
}

/**
 * Service class để xử lý logic business liên quan đến User
 */
export class UserService {
  private static readonly STORAGE_KEY = "app_user";

  /**
   * Lấy thông tin người dùng hiện tại từ local storage
   */
  static getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.STORAGE_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error("Failed to parse user data:", error);
      return null;
    }
  }

  /**
   * Lưu thông tin người dùng vào local storage
   */
  static saveUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  /**
   * Xóa thông tin người dùng khỏi local storage
   */
  static clearUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Kiểm tra xem người dùng có phải là admin hay không
   */
  static isAdmin(user: User | null): boolean {
    return user?.role === "admin";
  }

  /**
   * Giả lập đăng nhập
   */
  static async login(email: string, password: string): Promise<User> {
    // Giả lập delay của API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Giả lập xác thực
    if (email === "admin@example.com" && password === "password") {
      const user: User = {
        id: "1",
        username: "admin",
        email: "admin@example.com",
        role: "admin",
        name: "Admin User",
      };
      this.saveUser(user);
      return user;
    } else if (email === "user@example.com" && password === "password") {
      const user: User = {
        id: "2",
        username: "user",
        email: "user@example.com",
        role: "user",
        name: "Regular User",
      };
      this.saveUser(user);
      return user;
    }

    throw new Error("Invalid credentials");
  }

  /**
   * Đăng xuất
   */
  static logout(): void {
    this.clearUser();
  }

  /**
   * Kiểm tra trạng thái đăng nhập
   */
  static isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  /**
   * Cập nhật thông tin người dùng
   */
  static async updateUserProfile(
    userId: string,
    updates: Partial<User>
  ): Promise<User> {
    // Giả lập delay của API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const currentUser = this.getCurrentUser();
    if (!currentUser || currentUser.id !== userId) {
      throw new Error("Unauthorized");
    }

    const updatedUser = { ...currentUser, ...updates };
    this.saveUser(updatedUser);

    return updatedUser;
  }
}
