class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
          cafe: { descricao: 'Café', valor: 3.0 },
          chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5 },
          suco: { descricao: 'Suco Natural', valor: 6.2 },
          sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
          queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
          salgado: { descricao: 'Salgado', valor: 7.25 },
          combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
          combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5 },
        };
    
        this.metodoDePagamento = ['dinheiro', 'debito', 'credito'];
      }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.metodoDePagamento.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
        return 'Não há itens no carrinho de compra!';
        }

        let valorTotal = 0;
        let hasCafe = false;
        let hasSanduiche = false;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            if (!this.cardapio[codigo]) {
                return 'Item inválido!';
            }

            const valorItem = this.cardapio[codigo].valor * parseInt(quantidade);

            if (codigo === 'cafe') {
                hasCafe = true;
            } else if (codigo === 'sanduiche') {
                hasSanduiche = true;
            }

            if (codigo !== 'chantily' && codigo !== 'queijo') {
                valorTotal += valorItem;
            } else if (codigo === 'chantily' && !hasCafe) {
                return 'Item extra não pode ser pedido sem o principal';
            } else if (codigo === 'chantily' && hasCafe) {
                valorTotal += valorItem;
            } else if (codigo === 'queijo' && !hasSanduiche) {
                return 'Item extra não pode ser pedido sem o principal';
            } else if (codigo === 'queijo' && hasSanduiche) {
                valorTotal += valorItem;
            }
        }

        if(valorTotal == 0){
            return 'Quantidade inválida!';
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03; // Aplicar acréscimo de 3% para pagamento a crédito
        }
        
        return `R$ ${valorTotal.toFixed(2)}`.replace('.', ',');;
    }
}

export { CaixaDaLanchonete };
