import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class ServiceTests {

	@Test
	public void testA440() {
		System.out.println("@Test A 440");
		assertEquals(440, NoteFrequency.freq("A4"), .1);
	}

	@Test
	public void testC1() {
		System.out.println("@Test C1");
		assertEquals(32.7, NoteFrequency.freq("C1"), .1);
	}

	@Test
	public void testMiddleC() {
		System.out.println("@Test Middle C");
		assertEquals(261.63, NoteFrequency.freq("C4"), .1);
	}

	@Test
	public void testAccidental() {
		System.out.println("@Test Accidental");
		assertEquals(246.94, NoteFrequency.freq("Cb4"), .1);
	}
}
