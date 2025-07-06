// utils/roleUtils.ts

/**
 * Check if the user has the admin role.
 * @param role - The user's role
 * @returns boolean
 */
export const isAdmin = (role: string) => role === 'admin';

/**
 * Check if the user has the staff role.
 * @param role - The user's role
 * @returns boolean
 */
export const isStaff = (role: string) => role === 'staff';

/**
 * Check if the user has the student role.
 * @param role - The user's role
 * @returns boolean
 */
export const isStudent = (role: string) => role === 'student';
