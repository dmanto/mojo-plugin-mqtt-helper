import t from 'tap';
import tsd from 'tsd';

t.test('Types checking', async t => {
  const diagnostics = await tsd.default();
  if (diagnostics.length) t.fail('tsd check', diagnostics);
  t.pass('Done');
});
