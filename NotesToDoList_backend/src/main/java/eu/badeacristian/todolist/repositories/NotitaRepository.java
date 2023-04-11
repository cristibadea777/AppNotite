package eu.badeacristian.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import eu.badeacristian.todolist.entities.Notita;


@Repository
public interface NotitaRepository extends JpaRepository<Notita, Long> {
	
}
