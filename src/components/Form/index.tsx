import FormItem from 'components/FormItem';
import './styles.scss';

export default function Form() {
  return (
    <div className="form-container">
      <div className="form-header">teste</div>
      <div className="form-content">
        <FormItem>
          <>
            <div className="line">
              <span className="w75">
                <strong>Descrição:&nbsp;</strong>Usar qualquer veículo para, deliberadamente, interromper a circulação na via sem autorização do órgão
              </span>

              <span className="w25">
                <strong className="no-wrap">Data | Hora:&nbsp;</strong>01/01/2021 | 13:00
              </span>
            </div>

            <div className="line">
              <span className="w25">
                <strong>Motorista:&nbsp;</strong>Claudio
              </span>

              <span className="w25">
                <strong>Carro:&nbsp;</strong>Mercedes Preta
              </span>

              <span className="w25">
                <strong>Placa:&nbsp;</strong>DPA8883
              </span>

              <span className="w25">
                <strong>Prazo para indicação do condutor:&nbsp;</strong>01/01/2021
              </span>
            </div>

            <div className="line">
              <span className="w25">
                <strong>AIT:&nbsp;</strong>QXA53152130
              </span>

              <span className="w25">
                <strong>Pontuação:&nbsp;</strong>7
              </span>

              <span className="w25">
                <strong>Valor:&nbsp;</strong>R$ 130,00
              </span>

              <span className="w25">
                {/* <input type="radio" value="indicated" />
                <label htmlFor="indicated">Indicado</label>

                <input type="radio" value="not-indicated" />
                <label htmlFor="not-indicated">Não indicado</label> */}
                <strong>Situação:&nbsp;</strong>indicado
              </span>
            </div>
          </>
        </FormItem>
      </div>
    </div>
  );
}
