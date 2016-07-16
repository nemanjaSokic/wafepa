package jwd.wafepa;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jwd.wafepa.model.Activity;
import jwd.wafepa.model.Address;
import jwd.wafepa.model.User;
import jwd.wafepa.service.ActivityService;
import jwd.wafepa.service.AddressService;
import jwd.wafepa.service.UserService;

@Component
public class TestData {

	@Autowired
	private UserService userService;
	
	@Autowired
	private AddressService addressService;
	@Autowired
	private ActivityService activityService;
	@PostConstruct
	public void init(){
		
		User user2 = new User();
        user2.setFirstName("Pera");
        user2.setLastName("Markovic");
        user2.setEmail("emailPera@example.com");
        user2.setPassword("123");
        userService.save(user2);
        
        User user1 = new User();
        user1.setFirstName("Marko");
        user1.setLastName("Peric");
        user1.setEmail("emailMarko@example.com");
        user1.setPassword("123");
        userService.save(user1);
		
	       for (int i = 1; i <= 15; i++) {
	            User user = new User();
	            user.setFirstName("First name " + i);
	            user.setLastName("Last name " + i);
	            user.setEmail("email" + i + "@example.com");
	            user.setPassword("123");
	            userService.save(user);

	            for (int j = 1; j <= 3; j++) {
	                Address address = new Address();
	                address.setNumber(j + "c/7");
	                address.setStreat("Narodnog fronta");

	                address.setUser(user);
	                user.addAddress(address);
	                addressService.save(address);
	            }
	       }
	       for (int i = 0; i<=10; i++) {
	    	   Activity a = new Activity("activity" + i);
	    	   activityService.save(a);
		}	
	}
}
