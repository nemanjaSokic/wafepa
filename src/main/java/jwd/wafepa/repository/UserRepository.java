package jwd.wafepa.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jwd.wafepa.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
//	@Query("select u from tbl_user u where u.first_name = :firstname or u.last_name = :lastname")
	Page<User> findByLastnameContainingOrFirstnameContaining(Pageable page,@Param("lastname") String lastname,@Param("firstname") String firstname);
}
