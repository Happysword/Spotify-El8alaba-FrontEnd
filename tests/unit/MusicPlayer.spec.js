import Requests from '../../src/store/modules/MusicPlayer/Requests';

describe('Requests of Player', () => {
  it('startPlayback request test', async () => {
    expect.assertions(1);
    const data = await Requests.startPlayback();
    expect(data).toEqual(true);
  });

  it('pausePlayback request test', async () => {
    expect.assertions(1);
    const data = await Requests.pausePlayback();
    expect(data).toEqual(true);
  });

  it('skipNext request test', async () => {
    expect.assertions(1);
    const data = await Requests.skipNext();
    expect(data).toEqual(true);
  });

  it('skipPrevious request test', async () => {
    expect.assertions(1);
    const data = await Requests.skipPrevious();
    expect(data).toEqual(true);
  });

  describe('toggleShuffle request test', () => {
    let data;
    expect.assertions(3);

    it('Sends true to toggleShuffle', async () => {
      data = await Requests.toggleShuffle(true);
      expect(data).toEqual(true);
    });

    it('Sends False to toggleShuffle', async () => {
      data = await Requests.toggleShuffle(false);
      expect(data).toEqual(true);
    });

    it('Sends Non-Boolean to toggleShuffle', async () => {
      data = await Requests.toggleShuffle(12);
      expect(data).toEqual(false);
    });
  });

  describe('toggleRepeat request test', () => {
    let data;
    expect.assertions(3);

    it('Sends off to toggleRepeat', async () => {
      data = await Requests.toggleRepeat('off');
      expect(data).toEqual(true);
    });

    it('Sends False to toggleRepeat', async () => {
      data = await Requests.toggleRepeat('track');
      expect(data).toEqual(true);
    });

    it('Sends incorrect value to toggleRepeat', async () => {
      data = await Requests.toggleRepeat(12);
      expect(data).toEqual(false);
    });
  });

  describe('seekPosition request test', () => {
    let data;
    expect.assertions(3);

    it('Sends correct value to seekPosition', async () => {
      data = await Requests.seekPosition(12);
      expect(data).toEqual(true);
    });

    it('Sends negative number to seekPosition', async () => {
      data = await Requests.seekPosition(-10);
      expect(data).toEqual(false);
    });

    it('Sends incorrect value to seekPosition', async () => {
      data = await Requests.seekPosition('test');
      expect(data).toEqual(false);
    });
  });

  describe('setVolume request test', () => {
    let data;
    expect.assertions(4);

    it('Sends correct value to setVolume', async () => {
      data = await Requests.setVolume(20);
      expect(data).toEqual(true);
    });

    it('Sends negative number to setVolume', async () => {
      data = await Requests.setVolume(-10);
      expect(data).toEqual(false);
    });

    it('Sends incorrect value to setVolume', async () => {
      data = await Requests.setVolume(150);
      expect(data).toEqual(false);
    });

    it('Sends incorrect value to setVolume', async () => {
      data = await Requests.setVolume('test');
      expect(data).toEqual(false);
    });
  });
});
