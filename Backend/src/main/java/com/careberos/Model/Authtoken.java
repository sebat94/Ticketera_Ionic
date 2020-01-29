
package com.careberos.Model;

import java.math.BigInteger;
import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.util.List;
import java.util.Random;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.util.Date;

/**
 *
 * @author user
 */
@Entity
public class Authtoken {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    
    private String token;
    
    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="fk_authtoken_user")
    private User user;
    
    private Timestamp date = new Timestamp(System.currentTimeMillis());
    
    public Authtoken() {
    }


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public void generateToken() throws NoSuchAlgorithmException {
		//Random random = new SecureRandom();
		//this.token = new BigInteger(256, random).toString(32);
		//The JWT signature algorithm we will be using to sign the token
	    SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS512;
	 
	    long nowMillis = System.currentTimeMillis();
	    Date now = new Date(nowMillis);
	    
	   /* KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
	    SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
	    keyGen.initialize(1024, random);
	    KeyPair pair = keyGen.generateKeyPair();
	    PrivateKey priv = pair.getPrivate();
	    PublicKey pub = pair.getPublic();*/
	    //We will sign our JWT with our ApiKey secret
	    byte[] apiKeySecretBytes = "aquiirialaapikey".getBytes();
	    Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
	 
	    //Let's set the JWT Claims
	    JwtBuilder builder = Jwts.builder()
	                                .setIssuedAt(now)
	                                .setSubject("users/TzMUocMF4p")
	                                .signWith(signatureAlgorithm, signingKey);
	 
	    //if it has been specified, let's add the expiration
	    if (3000 >= 0) {
	    long expMillis = nowMillis + 3000;
	        Date exp = new Date(expMillis);
	        builder.setExpiration(exp);
	    }
	 
	    //Builds the JWT and serializes it to a compact, URL-safe string
	    this.token = builder.compact();
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
    
}
