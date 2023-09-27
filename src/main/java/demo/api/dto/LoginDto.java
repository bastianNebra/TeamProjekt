package demo.api.dto;
import demo.model.Position;
import java.io.Serializable;

@SuppressWarnings("serial")
public class LoginDto implements Serializable
{
	String username;
	String lastname;
	String password;
	public Position position;

	public LoginDto(String username, String lastname, String password, Position position) {
		this.username = username;
		this.lastname = lastname;
		this.password = password;
		this.position = position;
	}

	public LoginDto() {
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
