package io.github.carlos.rest.dto;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicoPrestadoDTO {

	@NotBlank(message = "Descrição não pode está vazio!")
	private String descricao;
	
	@NotBlank(message = "Valor não pode está vazio!")
	private String valor;
	
	@NotBlank(message = "Data não pode está vazio!")
	private String data;
	private Integer idCliente;
}
