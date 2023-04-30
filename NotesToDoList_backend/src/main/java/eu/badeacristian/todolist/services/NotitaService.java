package eu.badeacristian.todolist.services;

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
		return notitaRepository.findAll();
	}
	
	public List<Notita> getAllNotiteArhivate(){
		return notitaRepository.findAllArhivate();
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
		//cele nearhivate (cu starea goala) se vor arhiva, cele arhivate se dezarhiveaza
		notita.setStare(notita.getStare().equals("arhivata") ? "" : "arhivata");
		notitaRepository.save(notita);
	}
	
	public List<Notita> cautareNotita(String text) {
		return notitaRepository.findByTitluContainingAndStare(text, "");
	}

	public List<Notita> cautareNotitaArhivata(String text) {
		return notitaRepository.findByTitluContainingAndStare(text, "arhivata");
	}

	
}
