import BI from "../models/BI/BIModel";

class ProcessadorAutomatico {
    private emExecucao: boolean = false;
    private intervaloMinimo: number = 10000;

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
        await BI.calculateNextSixMonths();
    }
}

const processador = new ProcessadorAutomatico();
processador.processar();