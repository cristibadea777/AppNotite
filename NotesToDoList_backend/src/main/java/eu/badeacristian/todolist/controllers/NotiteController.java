package eu.badeacristian.todolist.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import eu.badeacristian.todolist.entities.Notita;
import eu.badeacristian.todolist.services.NotitaService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/notite")
@CrossOrigin(origins = "http://localhost:3000")
@Log4j2
public class NotiteController {

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Dependente ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	@Autowired
	private NotitaService notitaService;
		
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Atribute Model ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	@ModelAttribute(name = "listaNotite")
	public List<Notita> addListaNotiteToModel(){
		return notitaService.getAllNotite();
	}
		 
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Cereri ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	@GetMapping
	@Cacheable("false")
	public List<Notita> afiseazaNotite(Model model) {
		@SuppressWarnings("unchecked")
		List<Notita> listaNotite = (List<Notita>) model.getAttribute("listaNotite");
		return listaNotite;
	}
	
	@GetMapping("/{id}")
	@Cacheable("false")
	public Optional <Notita> afiseazaNotita(@PathVariable("id") long id) {
		return notitaService.getNotita(id);
	}
	
	@PostMapping
	public Notita scrieNotita(@RequestBody @Valid Notita notita) {
		log.info("\n" +"Notita salvata: " + "\n" + notita.toString());
		return notitaService.saveNotita(notita);
	}
	
	@PutMapping	
	public Notita updateNotita(@RequestBody @Valid Notita notita) {
		log.info("\n" +"Notita modificata: " + "\n" + notita.toString());
		return notitaService.saveNotita(notita);
	}
		
	
}
