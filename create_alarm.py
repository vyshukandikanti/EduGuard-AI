import wave, struct, math

f = wave.open('alarm.wav', 'w')
f.setnchannels(1)
f.setsampwidth(2)
f.setframerate(44100)

samples = []
for i in range(44100):
    value = int(32767 * math.sin(2 * math.pi * 880 * i / 44100))
    samples.append(struct.pack('<h', value))

f.writeframes(b''.join(samples))
f.close()
print("alarm.wav created successfully!")
