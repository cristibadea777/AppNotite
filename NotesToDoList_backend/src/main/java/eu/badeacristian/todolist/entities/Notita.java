package eu.badeacristian.todolist.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Notita {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long notitaId;
	
	//private long ownerId;
	
	private String titlu;
	@Column(columnDefinition="LONGTEXT")
	private String textNotita;
	private String imagine;
	private String stare;
	private String dataScriere;
	private String dataModificare;
	private String culoareTitlu;
	private String culoareText;
	
	public Notita(String titlu, String textNotita, String imagine, String stare, String dataScriere, String dataModificare, String culoareTitlu, String culoareText) {
		super();
		this.titlu 			= titlu;
		this.textNotita 	= textNotita;
		this.imagine 		= imagine;
		this.stare 			= stare;
		this.dataScriere 	= dataScriere;
		this.dataModificare = dataModificare;
		this.culoareTitlu 	= culoareTitlu;
		this.culoareText	= culoareText;
	}
	

	@Override
	public String toString() {
		return "Notita\n[\nnotitaId = " + notitaId + 
				",\ntitlu = " + titlu + 
				",\ntextNotita = " + textNotita + 
				",\nimagine = " + imagine + 
				",\nstare = " + stare +
				",\ndataScriere = " + dataScriere +
				",\ndataModificare = " + dataModificare +
				"\n]\n";
	}


	
}
