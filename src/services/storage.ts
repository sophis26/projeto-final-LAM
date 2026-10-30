import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Categoria, Lancamento, Usuario } from '../types';

export const STORAGE_KEYS = {
  usuarios: '@jims:usuarios',
  categorias: '@jims:categorias',
  lancamentos: '@jims:lancamentos',
} as const;

const readJson = async <T>(key: string, fallback: T): Promise<T> => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.warn(`Erro ao ler ${key}:`, error);
    return fallback;
  }
};

const writeJson = async <T>(key: string, value: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Erro ao salvar ${key}:`, error);
  }
};

export const categoriasPadrao: Omit<Categoria, 'id'>[] = [
  { nome: 'Mercado', cor: '#A9D94F' },
  { nome: 'Moradia', cor: '#6FA6E2' },
  { nome: 'Transporte', cor: '#9AC7F5' },
  { nome: 'Impostos', cor: '#A1C9F5' },
  { nome: 'Lazer', cor: '#D8F0A3' },
  { nome: 'Saúde', cor: '#8DD4BE' },
  { nome: 'Outros', cor: '#C8D1D8' },
];

const createId = (prefix: string): string => `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export async function ensureDefaultCategorias(): Promise<Categoria[]> {
  try {
    const categorias = await readJson<Categoria[]>(STORAGE_KEYS.categorias, []);

    if (categorias.length > 0) {
      return categorias;
    }

    const defaultCategorias = categoriasPadrao.map((categoria, index) => ({
      id: `categoria-${index + 1}`,
      ...categoria,
    }));

    await writeJson(STORAGE_KEYS.categorias, defaultCategorias);
    return defaultCategorias;
  } catch (error) {
    console.warn('Erro ao garantir categorias padrão:', error);
    return [];
  }
}

export async function createUsuario(usuario: Usuario): Promise<Usuario | null> {
  try {
    const usuarios = await readJson<Usuario[]>(STORAGE_KEYS.usuarios, []);
    const nextUsuarios = [...usuarios, usuario];
    await writeJson(STORAGE_KEYS.usuarios, nextUsuarios);
    return usuario;
  } catch (error) {
    console.warn('Erro ao criar usuário:', error);
    return null;
  }
}

export async function listUsuarios(): Promise<Usuario[]> {
  try {
    return await readJson<Usuario[]>(STORAGE_KEYS.usuarios, []);
  } catch (error) {
    console.warn('Erro ao listar usuários:', error);
    return [];
  }
}

export async function updateUsuario(id: string, updates: Partial<Usuario>): Promise<Usuario | null> {
  try {
    const usuarios = await readJson<Usuario[]>(STORAGE_KEYS.usuarios, []);
    const index = usuarios.findIndex((usuario) => usuario.id === id);

    if (index === -1) {
      return null;
    }

    const updatedUsuario = { ...usuarios[index], ...updates };
    usuarios[index] = updatedUsuario;
    await writeJson(STORAGE_KEYS.usuarios, usuarios);
    return updatedUsuario;
  } catch (error) {
    console.warn('Erro ao atualizar usuário:', error);
    return null;
  }
}

export async function removeUsuario(id: string): Promise<boolean> {
  try {
    const usuarios = await readJson<Usuario[]>(STORAGE_KEYS.usuarios, []);
    const nextUsuarios = usuarios.filter((usuario) => usuario.id !== id);
    await writeJson(STORAGE_KEYS.usuarios, nextUsuarios);
    return nextUsuarios.length !== usuarios.length;
  } catch (error) {
    console.warn('Erro ao remover usuário:', error);
    return false;
  }
}

export async function createCategoria(categoria: Categoria): Promise<Categoria | null> {
  try {
    const categorias = await ensureDefaultCategorias();
    const nextCategorias = [...categorias, categoria];
    await writeJson(STORAGE_KEYS.categorias, nextCategorias);
    return categoria;
  } catch (error) {
    console.warn('Erro ao criar categoria:', error);
    return null;
  }
}

export async function listCategorias(): Promise<Categoria[]> {
  try {
    return await ensureDefaultCategorias();
  } catch (error) {
    console.warn('Erro ao listar categorias:', error);
    return [];
  }
}

export async function updateCategoria(id: string, updates: Partial<Categoria>): Promise<Categoria | null> {
  try {
    const categorias = await ensureDefaultCategorias();
    const index = categorias.findIndex((categoria) => categoria.id === id);

    if (index === -1) {
      return null;
    }

    const updatedCategoria = { ...categorias[index], ...updates };
    categorias[index] = updatedCategoria;
    await writeJson(STORAGE_KEYS.categorias, categorias);
    return updatedCategoria;
  } catch (error) {
    console.warn('Erro ao atualizar categoria:', error);
    return null;
  }
}

export async function removeCategoria(id: string): Promise<boolean> {
  try {
    const categorias = await ensureDefaultCategorias();
    const nextCategorias = categorias.filter((categoria) => categoria.id !== id);
    await writeJson(STORAGE_KEYS.categorias, nextCategorias);
    return nextCategorias.length !== categorias.length;
  } catch (error) {
    console.warn('Erro ao remover categoria:', error);
    return false;
  }
}

export async function createLancamento(lancamento: Omit<Lancamento, 'id' | 'criadoEm'> & Partial<Pick<Lancamento, 'id' | 'criadoEm'>>): Promise<Lancamento | null> {
  try {
    const lancamentos = await readJson<Lancamento[]>(STORAGE_KEYS.lancamentos, []);
    const novoLancamento: Lancamento = {
      id: lancamento.id ?? createId('lancamento'),
      usuarioId: lancamento.usuarioId,
      descricao: lancamento.descricao,
      valor: lancamento.valor,
      tipo: lancamento.tipo,
      categoriaId: lancamento.categoriaId,
      data: lancamento.data,
      criadoEm: lancamento.criadoEm ?? new Date().toISOString(),
    };

    const nextLancamentos = [...lancamentos, novoLancamento];
    await writeJson(STORAGE_KEYS.lancamentos, nextLancamentos);
    return novoLancamento;
  } catch (error) {
    console.warn('Erro ao criar lançamento:', error);
    return null;
  }
}

export async function listLancamentos(usuarioId?: string): Promise<Lancamento[]> {
  try {
    const lancamentos = await readJson<Lancamento[]>(STORAGE_KEYS.lancamentos, []);

    if (!usuarioId) {
      return lancamentos;
    }

    return lancamentos.filter((lancamento) => lancamento.usuarioId === usuarioId);
  } catch (error) {
    console.warn('Erro ao listar lançamentos:', error);
    return [];
  }
}

export async function updateLancamento(id: string, updates: Partial<Lancamento>): Promise<Lancamento | null> {
  try {
    const lancamentos = await readJson<Lancamento[]>(STORAGE_KEYS.lancamentos, []);
    const index = lancamentos.findIndex((lancamento) => lancamento.id === id);

    if (index === -1) {
      return null;
    }

    const updatedLancamento = { ...lancamentos[index], ...updates };
    lancamentos[index] = updatedLancamento;
    await writeJson(STORAGE_KEYS.lancamentos, lancamentos);
    return updatedLancamento;
  } catch (error) {
    console.warn('Erro ao atualizar lançamento:', error);
    return null;
  }
}

export async function removeLancamento(id: string): Promise<boolean> {
  try {
    const lancamentos = await readJson<Lancamento[]>(STORAGE_KEYS.lancamentos, []);
    const nextLancamentos = lancamentos.filter((lancamento) => lancamento.id !== id);
    await writeJson(STORAGE_KEYS.lancamentos, nextLancamentos);
    return nextLancamentos.length !== lancamentos.length;
  } catch (error) {
    console.warn('Erro ao remover lançamento:', error);
    return false;
  }
}

export default {
  STORAGE_KEYS,
  categoriasPadrao,
  ensureDefaultCategorias,
  createUsuario,
  listUsuarios,
  updateUsuario,
  removeUsuario,
  createCategoria,
  listCategorias,
  updateCategoria,
  removeCategoria,
  createLancamento,
  listLancamentos,
  updateLancamento,
  removeLancamento,
};
