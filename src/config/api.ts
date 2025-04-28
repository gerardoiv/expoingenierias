export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/register.php`,
  login: `${API_BASE_URL}/login.php`,
  uploadProject: `${API_BASE_URL}/upload_project.php`,
  getUserProjects: `${API_BASE_URL}/get_user_projects.php`,
  adminLogin: `${API_BASE_URL}/admin/login.php`,
  getProjects: `${API_BASE_URL}/admin/get_projects.php`,
  getUsers: `${API_BASE_URL}/admin/get_users.php`,
  downloadProject: `${API_BASE_URL}/admin/download_project.php`,
  updateProjectStatus: `${API_BASE_URL}/admin/update_project_status.php`,
}; 