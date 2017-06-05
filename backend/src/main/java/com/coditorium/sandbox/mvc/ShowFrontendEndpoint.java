package com.coditorium.sandbox.mvc;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
class ShowFrontendEndpoint {
  @GetMapping(path = {"/", "/**/{path:[^\\.]*}"}, produces = MediaType.TEXT_HTML_VALUE)
  String home() {
    return "forward:/index.html";
  }
}
