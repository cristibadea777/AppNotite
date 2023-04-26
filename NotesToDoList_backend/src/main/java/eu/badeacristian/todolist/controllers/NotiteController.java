package eu.badeacristian.todolist.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@SuppressWarnings("unchecked")
public class NotiteController {

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Dependente ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	@Autowired
	private NotitaService notitaService;
		
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Atribute Model ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	@ModelAttribute(name = "listaNotite")
	//listaNotite = notite nearhivate
	public List<Notita> addListaNotiteToModel(){
		return notitaService.getAllNotite();
	}
	
	//listaNotiteArhivate
	@ModelAttribute(name = "listaNotiteArhivate")
	public List<Notita> addListaNotiteArhivateToModel(){
		return notitaService.getAllNotiteArhivate();
	}
	
		 
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Cereri ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	@GetMapping
	@Cacheable("false")
	public List<Notita> afiseazaNotite(Model model) {
		List<Notita> listaNotite = (List<Notita>) model.getAttribute("listaNotite");
		return listaNotite;
	}
	
	@GetMapping("/{id}")
	@Cacheable("false")
	public Optional <Notita> afiseazaNotita(@PathVariable("id") long id) {
		return notitaService.getNotita(id);
	}
	
	@GetMapping("/arhivate")
	@Cacheable("false")
	public List<Notita> afiseazaNotiteArhivate(Model model){
		List<Notita> listaNotiteArhivate = (List<Notita>) model.getAttribute("listaNotiteArhivate");
		return listaNotiteArhivate;
	}
	
	@PostMapping
	public void scrieNotita(@RequestBody @Valid Notita notita) {
		log.info("\n" +"Notita creata: " + "\n" + notita.toString());
		notitaService.saveNotita(notita);
	}
	
	@PutMapping	
	public void modificaNotita(@RequestBody @Valid Notita notita) {
		log.info("\n" +"Notita modificata: " + "\n" + notita.toString());
		try {
			notitaService.saveNotita(notita);
		} catch (Exception e) {
			log.error("\nEroare: ~~~~~~~    " + e);
		}
	}
	
	@PutMapping("/arhivare")	
	public void arhivareNotita(@RequestBody @Valid Notita notita) {
		log.info("\n" +"Notita arhivata: " + "\n" + notita.toString());
		try {
			notitaService.arhivareNotita(notita);
		} catch (Exception e) {
			log.error("\nEroare: ~~~~~~~    " + e);
		}
	}
	
	@DeleteMapping
	public void stergeNotita(@RequestBody @Valid Notita notita) {
		log.info("\n" +"Notita de sters: " + "\n" + notita.toString());
		try {
			notitaService.deleteNotita(notita);
		} catch (Exception e) {
			log.error("\nEroare: ~~~~~~~    " + e);
		}
	}
		
	
}
