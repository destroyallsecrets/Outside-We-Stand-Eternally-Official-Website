import { GithubRepo } from '../types';

const GITHUB_API = 'https://api.github.com';
const GITHUB_USER = 'destroyallsecrets';

export async function fetchDeployedProjects(): Promise<GithubRepo[]> {
  const response = await fetch(`${GITHUB_API}/users/${GITHUB_USER}/repos?sort=updated&per_page=100`);
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  const repos: GithubRepo[] = await response.json();
  return repos.filter(repo => repo.homepage && !repo.archived && !repo.disabled);
}

export async function fetchUndeployedRepos(): Promise<GithubRepo[]> {
  const response = await fetch(`${GITHUB_API}/users/${GITHUB_USER}/repos?sort=updated&per_page=100`);
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  const repos: GithubRepo[] = await response.json();
  return repos.filter(repo => !repo.homepage && !repo.archived && !repo.disabled);
}
