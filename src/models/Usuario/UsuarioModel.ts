import { db } from "../../../app"; 

class Usuario {
    private id_usuario: number;
    private tx_nome: string;
    private tx_email: string;
    private tx_senha: string;

    constructor(id_usuario: number, tx_nome?: string, tx_email?: string, tx_senha?: string) {
        this.id_usuario = id_usuario;
        this.tx_nome = tx_nome ?? '';
        this.tx_email = tx_email ?? '';
        this.tx_senha = tx_senha ?? '';
    }

    public getIdUsuario(): number {
        return this.id_usuario;
    }

    public getTxNome(): string {
        return this.tx_nome;
    }

    public getTxEmail(): string {
        return this.tx_email;
    }

    public getTxSenha(): string {
        return this.tx_senha;
    }

    public static async loginUsuario(tx_email: string, tx_senha: string): Promise<object> {
        try {
            const sql_search = `SELECT * FROM tb_usuario WHERE tx_email = ? AND tx_senha = ?`;
            const response = await db.all(sql_search, [tx_email, tx_senha]);

            return {
                result: response.length > 0 ? 'success' : 'error',
                message: response.length > 0 
                    ? 'Login realizado com sucesso.' 
                    : 'E-mail ou senha inválidos.',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar logar com usuário.'
            };
        }
    }

    public static async criarUsuario(tx_nome: string, tx_email: string, tx_senha: string): Promise<object> {
        try {
            const sql_insert = `
                INSERT INTO tb_usuario(tx_nome, tx_email, tx_senha, tx_tipo_usuario)
                VALUES (?, ?, ?, 'ADMIN')
            `;
            
            const result = await db.run(sql_insert, [tx_nome, tx_email, tx_senha]);
            
            if (result.lastID) {
                return {
                    result: 'success',
                    message: 'Usuário criado com sucesso',
                    data: new Usuario(result.lastID, tx_nome, tx_email, tx_senha)
                };
            }
            throw new Error('Falha ao criar usuário');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar criar usuário.'
            };
        }
    }

    public static async buscarUsuario(id_usuario?: number): Promise<object> {
        try {
            let sql: string;
            let params: any[] = [];

            if (id_usuario) {
                sql = `SELECT * FROM tb_usuario WHERE id_usuario = ?`;
                params = [id_usuario];
            } else {
                sql = `SELECT * FROM tb_usuario ORDER BY id_usuario`;
            }

            const response = await db.all(sql, params);

            return {
                result: 'success',
                message: response.length > 0 
                    ? 'Usuário(s) encontrado(s) com sucesso' 
                    : id_usuario ? 'Usuário não encontrado' : 'Nenhum usuário cadastrado',
                data: response.length > 0 ? response : null
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar buscar usuário(s).'
            };
        }
    }

    public async atualizarUsuario(tx_nome: string, tx_email: string, tx_senha: string): Promise<object> {
        try {
            const sql_update = `
                UPDATE tb_usuario
                SET tx_nome = ?, tx_email = ?, tx_senha = ?
                WHERE id_usuario = ?
            `;

            const result = await db.run(sql_update, [tx_nome, tx_email, tx_senha, this.id_usuario]);

            if (result) {
                this.tx_nome = tx_nome;
                this.tx_email = tx_email;
                this.tx_senha = tx_senha;
                
                return {
                    result: 'success',
                    message: 'Usuário atualizado com sucesso'
                };
            }
            throw new Error('Nenhum usuário foi atualizado');
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar atualizar usuário.'
            };
        }
    }

    public async deletarUsuario(): Promise<object> {
        try {
            const result = await db.run(
                'DELETE FROM tb_usuario WHERE id_usuario = ?', 
                [this.id_usuario]
            );

            return {
                result: result ? 'success' : 'error',
                message: result 
                    ? 'Usuário deletado com sucesso' 
                    : 'Nenhum usuário foi deletado'
            };
        } catch (error: any) {
            return {
                result: 'error',
                message: error?.message ?? 'Erro ao tentar deletar usuário.'
            };
        }
    }
}

export default Usuario;