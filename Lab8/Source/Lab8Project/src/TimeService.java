import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Path("/timeservice")
public class TimeService {
 
	@GET
	@Produces("application/json")
	public Response getTime() throws JSONException {
 
		JSONObject jsonObject = new JSONObject();
		DateFormat df = new SimpleDateFormat("HH mm ss");
		Date now = new Date();
		String[] hms = df.format(now).split("\\s");
		jsonObject.put("hour", hms[0]);
		jsonObject.put("minute", hms[1]);
		jsonObject.put("second", hms[2]);
 
		String result = jsonObject.toString();
		return Response.status(200).entity(result).build();
	}
}
