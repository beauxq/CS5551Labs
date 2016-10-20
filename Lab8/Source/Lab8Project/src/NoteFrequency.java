import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

@Path("/notefrequency")
public class NoteFrequency {

	@Path("{note}")
    @GET
    @Produces("application/json")
    public Response convertNoteToFrequency(@PathParam("note") String note) throws JSONException {

		JSONObject jsonObject = new JSONObject();

		jsonObject.put("note", note);
		jsonObject.put("frequency", freq(note));

		String result = "@Produces(\"application/json\") Output: \n\nFrequency of given note: \n\n" + jsonObject;
		return Response.status(200).entity(result).build();
	}

    /**
     * @param string "NAO" - where N = note name, A = accidental, O = octave (middle C 4)
     * @return frequency of a musical note
     */
    static double freq(String string) {
        // TODO: this could use some exception handling

        if (string.length() == 2) {
            string = string.charAt(0) + " " + string.charAt(1);
        }
        string = string.toUpperCase();
        if (string.charAt(0) == 'C' ||
                string.charAt(0) == 'D' ||
                string.charAt(0) == 'E' ||
                string.charAt(0) == 'F' ||
                string.charAt(0) == 'G') {
            string = string.substring(0, 2) + (Integer.parseInt(string.substring(2))-1);
        }

        double exponent = Integer.parseInt(string.substring(2));
        exponent += (double)halfSteps.get(string.substring(0, 2)) / 12;

        return 27.5 * Math.pow(2, exponent);
    }

    private static HashMap<String, Integer> halfSteps = new HashMap<>();
    static{
        halfSteps.put("A ", 0);
        halfSteps.put("A#", 1);
        halfSteps.put("BB", 1);
        halfSteps.put("B ", 2);
        halfSteps.put("CB", 2);
        halfSteps.put("B#", 3);
        halfSteps.put("C ", 3);
        halfSteps.put("C#", 4);
        halfSteps.put("DB", 4);
        halfSteps.put("D ", 5);
        halfSteps.put("D#", 6);
        halfSteps.put("EB", 6);
        halfSteps.put("E ", 7);
        halfSteps.put("FB", 7);
        halfSteps.put("E#", 8);
        halfSteps.put("F ", 8);
        halfSteps.put("F#", 9);
        halfSteps.put("GB", 9);
        halfSteps.put("G ", 10);
        halfSteps.put("G#", 11);
        halfSteps.put("AB", -1);
    }
}
