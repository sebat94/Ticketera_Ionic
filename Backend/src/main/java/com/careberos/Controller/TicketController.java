package com.careberos.Controller;

import com.careberos.Controller.Utils.Utils;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.EnumMap;
import java.util.Hashtable;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.careberos.Model.Authtoken;
import com.careberos.Model.Promotor;
import com.careberos.Model.Ticket;
import com.careberos.Model.Typeticket;
import com.careberos.Model.User;
import com.careberos.Repository.AuthtokenRepository;
import com.careberos.Repository.PromotorRepository;
import com.careberos.Repository.RrppRepository;
import com.careberos.Repository.TicketRepository;
import com.careberos.Repository.TypeticketRepository;
import com.careberos.Response.BasicResponse;
import com.careberos.Response.TicketsResponse;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import java.io.ByteArrayInputStream;

@RestController
@RequestMapping(path="/ticket")
public class TicketController {
	@Autowired
	private TicketRepository tr;
	
	@Autowired
	private AuthtokenRepository atr;
	
	@Autowired
	private TypeticketRepository ttr;
	
	@Autowired
	private RrppRepository rpr;
	
	@Autowired
	private PromotorRepository pr;
	
	@RequestMapping(value = "{id}/image", method = RequestMethod.GET, produces = "image/png")
	public @ResponseBody byte[] getFile(@RequestHeader("Authorization") String authHeader, @PathVariable(value="id") Long id)  {
	    try {
	    	String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			Ticket t = tr.findOne(id);
			if(t.getUser().getId() == u.getId()) {
		    	//ClassPathResource img = new ClassPathResource("images/"+id+".png");
		    	
                BufferedImage image = Utils.generateQR(""+id, 256);
                ByteArrayOutputStream os = new ByteArrayOutputStream();
                ImageIO.write(image, "jpg", os);
                InputStream is = new ByteArrayInputStream(os.toByteArray());
                        
		    	ByteArrayOutputStream bos = new ByteArrayOutputStream();
		    	int next = is.read();
		    	while (next > -1) {
		    	    bos.write(next);
		    	    next = is.read();
		    	}
		    	bos.flush();
		    	byte[] result = bos.toByteArray();
		    	byte[] encoded = Base64.getEncoder().encode(result);
		    	return encoded;
			}
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    byte[] b = new byte[0];
	    return b;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody TicketsResponse getTicketsByUser(@RequestHeader("Authorization") String authHeader) {
		TicketsResponse ttrr = new TicketsResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
			ttrr.setCode(200);
            ttrr.setTickets((ArrayList<Ticket>) tr.findTicketsByUser(u));
		} catch(Exception ex) {
			ex.printStackTrace();
			ttrr.setCode(500);
		}
		return ttrr;
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody BasicResponse buyTicket(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> payload) {
		BasicResponse basicResponse = new BasicResponse();
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
				Ticket t = new Ticket();
				Typeticket tt = ttr.findOne(Long.parseLong(payload.get("typeticket").toString()));
				
				if(tt.getAmountSold() < tt.getTotalAmount()) {
					tt.setAmountSold(tt.getAmountSold()+1);
					ttr.save(tt);
					t.setTypeticket(tt);
					t.setUser(u);
					t.setActive(true);
					tr.save(t);
					basicResponse.setCode(200);
					basicResponse.setMessage("Entrada comprada correctamente");
				} else {
					basicResponse.setCode(200);
					basicResponse.setMessage("Entradas agotadas");
				}
		} catch(Exception ex) {
			ex.printStackTrace();
			basicResponse.setCode(500);
			basicResponse.setMessage("Error al comprar tu entrada");
		}
		
		return basicResponse;
	}
	
	@RequestMapping(value="/{idTicket}", method = RequestMethod.GET)
	public @ResponseBody Ticket getTicket(@RequestHeader("Authorization") String authHeader, @PathVariable(value="idTicket") Long idTicket) {
		Ticket t = null;
		try {
			String token = authHeader.split(" ")[1];
			Authtoken a = atr.findByToken(token);
			User u = a.getUser();
            Promotor promotor = pr.findByUser(u);
            t = tr.findOne(idTicket);
            if(!t.isActive() || t.getTypeticket().getEvent().getBuilding().getCompany().getPromotor().getId() != promotor.getId()) {
            	t = null;
            }
		} catch(Exception e) {
			e.printStackTrace();
		}
		return t;
	}
}
