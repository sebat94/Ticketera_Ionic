package com.careberos.Repository;

import org.springframework.data.repository.CrudRepository;

import com.careberos.Model.Event;
import com.careberos.Model.EventImages;


public interface EventImagesRepository extends CrudRepository<EventImages, Long> {
	Iterable<EventImages> findEventImagesByEvent(Event e);
}
