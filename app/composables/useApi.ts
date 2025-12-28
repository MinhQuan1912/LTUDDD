export const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie("token");

  const api = async (endpoint: string, options: any = {}) => {
    const headers: any = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`;
    }

    try {
      const response = await $fetch(`${config.public.apiBase}${endpoint}`, {
        ...options,
        headers,
      });
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.data || error.message };
    }
  };

  return {
    login: (credentials: any) =>
      api("/auth/login", {
        method: "POST",
        body: credentials,
      }),

    
    getStudents: () => api("/admin/students"),
    getStudent: (id: number) => api(`/admin/students/${id}`),
    createStudent: (data: any) =>
      api("/admin/students", {
        method: "POST",
        body: data,
      }),
    updateStudent: (id: number, data: any) =>
      api(`/admin/students/${id}`, {
        method: "PUT",
        body: data,
      }),
    deleteStudent: (id: number) =>
      api(`/admin/students/${id}`, {
        method: "DELETE",
      }),

    
    getScores: () => api("/admin/scores"),
    getScoresByStudent: (studentId: number) =>
      api(`/admin/scores/student/${studentId}`),
    createScore: (data: any) =>
      api("/admin/scores", {
        method: "POST",
        body: data,
      }),
    updateScore: (id: number, data: any) =>
      api(`/admin/scores/${id}`, {
        method: "PUT",
        body: data,
      }),
    deleteScore: (id: number) =>
      api(`/admin/scores/${id}`, {
        method: "DELETE",
      }),
  };
};
