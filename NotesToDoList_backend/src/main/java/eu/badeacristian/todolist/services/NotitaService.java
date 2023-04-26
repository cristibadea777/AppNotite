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
	
	public List<Notita> getAllNotiteArhivate(){
		List<Notita> notite = new ArrayList<Notita>();
		notite = notitaRepository.findAllArhivate();
		return notite;
	}
	
	
	public Optional <Notita> getNotita(long id) {
		return notitaRepository.findById(id);
	}
	
	
	public void saveNotita(Notita notita) {
		notitaRepository.save(notita);
	}
	
	public void deleteNotita(Notita notita) {
		notitaRepository.delete(notita);
	}
	
	public void arhivareNotita(Notita notita) {
		notita.setStare("arhivata");
		notitaRepository.save(notita);
	}

	
}
