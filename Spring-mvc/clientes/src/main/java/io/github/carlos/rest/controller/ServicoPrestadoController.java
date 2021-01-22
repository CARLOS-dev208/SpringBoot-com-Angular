package io.github.carlos.rest.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.github.carlos.exception.NegocioException;
import io.github.carlos.model.entity.Cliente;
import io.github.carlos.model.entity.Servico;
import io.github.carlos.model.repository.ClienteRepository;
import io.github.carlos.model.repository.ServicoRepository;
import io.github.carlos.rest.dto.ServicoPrestadoDTO;

@RestController
@RequestMapping("/api/servico-prestado")
public class ServicoPrestadoController {

	@Autowired
	private ServicoRepository repository;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@PostMapping()
	@ResponseStatus(HttpStatus.CREATED)
	public Servico salva(@Valid @RequestBody ServicoPrestadoDTO servicoDTO) {
		var data = LocalDate.parse(servicoDTO.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
		Integer idCliente = servicoDTO.getIdCliente();
		
		Cliente cliente = this.clienteRepository.
				findById(idCliente).orElseThrow(() -> new NegocioException("Cliente inexistente."));
		var servico = new Servico();
		servico.setDescricao(servicoDTO.getDescricao());
		servico.setData(data);
		servico.setCliente(cliente);
		servico.setValor();
		return this.repository.save(servico);
	}
	
	@GetMapping
	public List<Servico> listarServico(){
		return this.repository.findAll();
	}
	
	
}