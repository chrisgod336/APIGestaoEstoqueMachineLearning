class ProcessadorAutomatico {
    private emExecucao: boolean = false;
    private intervaloMinimo: number = 10000;
    private apiUrl: string = 'http://localhost:3000/BI/calculateNextSixMonths';

    async processar(): Promise<void> {
        if (this.emExecucao) return;
        
        this.emExecucao = true;
        
        try {
            await this.executarTarefa();
        } catch (error) {
            console.error('Erro durante o processamento:', error);
        } finally {
            this.emExecucao = false;
            setTimeout(() => this.processar(), this.intervaloMinimo);
        }
    }

    private async executarTarefa(): Promise<void> {
    
        const response = await fetch(this.apiUrl, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer seu-token' 
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log('Resposta da API:', data);
    }
}

const processador = new ProcessadorAutomatico();
processador.processar();