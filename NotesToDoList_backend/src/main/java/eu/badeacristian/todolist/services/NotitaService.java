package eu.badeacristian.todolist.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import eu.badeacristian.todolist.entities.Notita;
import eu.badeacristian.todolist.repositories.NotitaRepository;

@Service
public class NotitaService {

	@Autowired
	private NotitaRepository notitaRepository;
	
	
	public List<Notita> getAllNotite(){
		List<Notita> notite = new ArrayList<Notita>();
		notite = notitaRepository.findAll();
		return notite;
	}
	
	
	public Optional <Notita> getNotita(long id) {
		return notitaRepository.findById(id);
	}
	
	
	public Notita saveNotita(Notita notita) {
		return notitaRepository.save(notita);
	}

	
}
