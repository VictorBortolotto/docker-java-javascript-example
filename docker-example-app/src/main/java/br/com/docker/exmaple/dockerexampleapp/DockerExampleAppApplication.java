package br.com.docker.exmaple.dockerexampleapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@SpringBootApplication
public class DockerExampleAppApplication {

	@GetMapping("/docker")
	public String helloDocker(){
		return "Hello Docker World!";
	}

	public static void main(String[] args) {
		SpringApplication.run(DockerExampleAppApplication.class, args);
	}

}
