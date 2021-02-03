package io.github.carlos.rest.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.github.carlos.exception.NegocioException;
import io.github.carlos.model.entity.Cliente;
import io.github.carlos.model.repository.ClienteRepository;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Cliente salva(@Valid @RequestBody Cliente cliente) {
		var clienteCpf = new Cliente();
		clienteCpf = this.clienteRepository.findByCpf(cliente.getCpf());
		if(clienteCpf != null && !clienteCpf.equals(cliente)) {
			throw new NegocioException("Já existe um cliente cadastro com esse CPF");
		}
		
		
		
	return	this.clienteRepository.save(cliente);	
	}
	
	@GetMapping
	public List<Cliente> listaCliente() {
		return clienteRepository.findAll();
	}
	
	@GetMapping("/{clienteId}")
	public Cliente buscar(@PathVariable Integer clienteId ) {
		return this.clienteRepository.findById(clienteId).orElseThrow(() -> new NegocioException("Cliente não encontrado!"));
	}
	
	@DeleteMapping("/{clienteId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleta(@PathVariable Integer clienteId) {
		this.clienteRepository.findById(clienteId).map(cliente ->{
			this.clienteRepository.deleteById(clienteId);
			return Void.TYPE;
		}).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@PutMapping("/{clienteId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void atualizaCliente( @PathVariable Integer clienteId,@Valid @RequestBody Cliente clienteAtualizado) {
		this.clienteRepository.findById(clienteId).map(cliente ->{
			clienteAtualizado.setId(clienteId);
			return this.clienteRepository.save(clienteAtualizado);
			
		}).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	
	
}
