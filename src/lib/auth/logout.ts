import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export interface LogoutResponse {
  success: boolean;
  error?: string;
}

/**
 * Logout current user
 */
export async function logoutUser(): Promise<LogoutResponse> {
  try {
    // Clear dev mode user from localStorage
    localStorage.removeItem('devModeUser');
    
    // Try Firebase logout if available
    await signOut(auth);
    return {
      success: true
    };
  } catch (error: any) {
    // Even if Firebase fails, dev mode logout succeeded
    console.log("Logout (dev mode or offline):", error?.message);
    return {
      success: true
    };
  }
}
