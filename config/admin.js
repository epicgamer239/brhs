/**
 * Admin Configuration
 * Hardcoded admin email for tutor management
 */

export const ADMIN_CONFIG = {
  // Hardcoded admin email - change this to your admin email
  ADMIN_EMAIL: '1021676@lcps.org', // Replace with your actual admin email
  
  // Admin permissions
  PERMISSIONS: {
    MANAGE_TUTORS: 'manage_tutors',
    VIEW_ALL_SESSIONS: 'view_all_sessions',
    MANAGE_USERS: 'manage_users'
  }
};

/**
 * Check if a user is an admin based on their email
 * @param {string} email - User's email address
 * @returns {boolean} - True if user is admin
 */
export const isAdminEmail = (email) => {
  return email === ADMIN_CONFIG.ADMIN_EMAIL;
};

/**
 * Get admin configuration
 * @returns {object} - Admin configuration object
 */
export const getAdminConfig = () => {
  return ADMIN_CONFIG;
};
