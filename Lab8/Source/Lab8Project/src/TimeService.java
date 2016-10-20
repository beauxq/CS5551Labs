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
		Integer hour = Integer.parseInt(hms[0]);
		Integer minute = Integer.parseInt(hms[1]);
		Integer second = Integer.parseInt(hms[2]);
		jsonObject.put("hour", hour);
		jsonObject.put("minute", minute);
		jsonObject.put("second", second);
 
		String result = "@Produces(\"application/json\") Output: \n\nCurrent Time: \n\n" + jsonObject;
		return Response.status(200).entity(result).build();
	}
}
