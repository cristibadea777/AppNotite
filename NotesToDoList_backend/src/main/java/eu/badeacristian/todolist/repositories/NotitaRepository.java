package eu.badeacristian.todolist.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import eu.badeacristian.todolist.entities.Notita;


@Repository
public interface NotitaRepository extends JpaRepository<Notita, Long> {
	
	//toate notitele ne-arhivate
	@Query(value = "SELECT * FROM notita WHERE stare!='arhivata'", nativeQuery = true)
	List<Notita> findAll();
	
	//toate notitele arhivate
	@Query(value = "SELECT * FROM notita WHERE stare='arhivata'", nativeQuery = true)
	List<Notita> findAllArhivate();
	
}
