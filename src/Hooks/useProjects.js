import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'progress-tracker-projects-v1';

export const useProjects = () => {
  const [projects, setProjects] = useLocalStorage(STORAGE_KEY, []);

  const addProject = (data) => {
    setProjects((prev) => [
      ...prev,
      { id: `p-${Date.now()}`, status: 'idea', ...data },
    ]);
  };

  const updateStatus = (id, status) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, status } : project))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return { projects, addProject, updateStatus, deleteProject };
};